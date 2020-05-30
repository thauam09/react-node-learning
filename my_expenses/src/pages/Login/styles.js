import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    form{
        padding:30px;
        margin: 12.5% auto;
        background-color: #AAA;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 700px;
        max-width: 700px;
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

        label{
            font-weight: bold;
            font-size: 16px;
        }

        input{
            border: 1px solid #FFF;
            border-radius: 2px;
            height: 25px;
            width: 75%;
            margin: 15px 0;
        }

        button{
            outline: 0;
            border: none;
            background-color: #000;
            color: #FFF;
            width: 75px;
            height: 30px;
            border-radius: 4px;
            text-decoration: none;
            text-align: center;
            line-height: 30px;
            font-weight: bold;
        }
        
        button:hover{
            color: #000;
            background-color: #FFF;
        }

    }
`;

export const Header = styled.div`
    background-color: #DDD;
    height: 100px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;