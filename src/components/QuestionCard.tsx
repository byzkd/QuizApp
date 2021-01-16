import { Button } from 'antd'
import React from 'react'
import {AnswerObject} from '../App'
import { Row, Col , Card} from 'antd';


type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNr, 
    totalQuestions, 
}) => (
    <div>
        
        <Row justify = 'center'>
        <Card style = {{width: 550, alignItems: 'center', marginTop: '50px', borderRadius:'10px'}}>
            <Col>
            <p className = 'number' style = {{marginBottom: '20px'}}>
            Question: {questionNr} / {totalQuestions}
        </p>
        <p style = {{marginBottom: '20px'}} dangerouslySetInnerHTML = {{ __html: question}}/>
        <div>
            {answers.map((answer) => (
                <div key = {answer}>
                    <Button style = {{ marginBottom: '10px', borderRadius : '5px'}} disabled={userAnswer ? true : false}  value = {answer} onClick = {callback}>
                        <span dangerouslySetInnerHTML = {{__html: answer}}/>
                    </Button>
                </div>
            ))}
            
        </div>

            </Col>
            </Card>
        </Row>

     
    </div>
);
export default QuestionCard;