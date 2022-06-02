import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Card,
  Container,
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

export const getSumOfTwoMinNumbers = (arr = []) => {
  if (arr.length === 0) return null;

  /* если честно, я боюсь представить, что на фронт приходит массив
  из ста миллионов элементов, даже пара десятков тысяч это уже серьезное
  испытание для приложения и архитектуры.
  Данная ф-я не идеальна, но всегда есть куда расти */
  const firstMinNum = Math.min(...arr);
  const newArr = arr.filter((_num, index) => index !== arr.indexOf(firstMinNum));
  const secondMinNum = Math.min(...newArr);

  return firstMinNum + secondMinNum;
};

const App = () => {
  const inputRef = useRef();
  const [result, setResult] = useState(null);
  const [inputFailed, setInputFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      value: '',
    },
    onSubmit: ({ value }) => {
      setInputFailed(false);

      try {
        const parsedValue = JSON.parse(`[${value}]`);
        if (parsedValue.length === 1) throw new Error();
        const sum = getSumOfTwoMinNumbers(parsedValue);
        setResult(sum);
      } catch (err) {
        setInputFailed(true);
      }
    },
  });

  return (
    <Container fluid className="h-75">
      <Row className="justify-content-center align-content-center py-5 h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-lg">
            <Card.Body className="row p-4">
              <Form onSubmit={formik.handleSubmit} className="col-md-6 mt-3 mt-mb-0">
                <div className="p-2">
                  Введите последовательность цифр через запятую,
                  мы найдём два минимальных числа и сложим их с:
                </div>
                <Form.FloatingLabel className="mb-2" id="value" label="Введите последовательность">
                  <Form.Control
                    className="form-control"
                    onChange={formik.handleChange}
                    value={formik.values.value}
                    ref={inputRef}
                    isInvalid={inputFailed}
                    id="value"
                    required
                  />
                  {inputFailed && (
                  <Form.Control.Feedback type="invalid">
                    Введите последовательность правильно, например: 1, 2, -5, 5, 100
                  </Form.Control.Feedback>
                  )}
                </Form.FloatingLabel>
                <Button className="w-100 mb-2 btn btn-primary" type="submit">
                  Отправить
                </Button>
              </Form>
              <Col xs={12} md={6} className="d-flex align-items-center jusitfy-content-center">
                <Container className="text-center">
                  {result ? <div>{`Ответ ${result}`}</div> : null}
                </Container>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
