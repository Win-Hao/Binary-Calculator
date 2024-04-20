"use client"
import React, {useRef, useState} from 'react';

const BinaryCalculator = () => {
    const [num, setNum] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const validBinary = /^[01]*$/;
        if (validBinary.test(e.target.value) || e.target.value === "") {
            setNum(e.target.value);
        }
    }
    const appendBinaryDigit = (digit: string) => {
        setNum((prevNum) => `${prevNum}${digit}`);
    };


    function checkOperators(str: string) {
        const regex = /(?<=.)(\+|\-|\*|\/)(?=.)/g;

        // 匹配字符串
        const matches = str.match(regex);

        // 检查是否找到匹配项
        if (matches && matches.length > 0) {
            console.log("存在加号或减号或乘号或除号且前后有内容的情况。");
            return true;
        } else {
            console.log("不存在加号或减号或乘号或除号前后有内容的情况。");
            return false;
        }
    }

    function calculateBinaryExpression(expression: string) {
        // 匹配操作数和运算符
        const regex = /([01]+)\s*([\+\-\*\/])\s*([01]+)/;
        const match = expression.match(regex);

        if (!match) {
            return "Invalid expression";
        }

        // 从匹配结果中提取操作数和运算符
        const [, operand1, operator, operand2] = match;

        // 将二进制字符串转换为十进制数
        const num1 = parseInt(operand1, 2);
        const num2 = parseInt(operand2, 2);

        let result;

        // 根据运算符执行相应的运算
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                // 确保不会除以零
                if (num2 === 0) {
                    return "Cannot divide by zero";
                }
                result = Math.floor(num1 / num2); // 使用整数除法
                break;
            default:
                return "Invalid operator";
        }

        // 将计算结果从十进制数转换回二进制字符串
        return result.toString(2);
    }
    return (
        <>
            <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col w-[33%]  mx-auto">
                <div>
                    <input
                        value={num}
                        className="bg-gray-200 border-2 border-black border-solid h-[48px] text-[20px] w-full"
                        type="text"
                        ref={inputRef}
                        onChange={changeHandler}
                    />
                </div>
                <div className=" grid grid-cols-4 gap-1 mt-1">
                    <button
                        onClick={() => {
                            appendBinaryDigit("0")
                        }}
                        className="bg-green-200 text-amber-900 h-[36px] text-[18px] m-0 border border-black">0
                    </button>
                    <button
                        onClick={() => {
                            appendBinaryDigit("1")
                        }}
                        className="bg-green-200 text-amber-900 h-[36px] text-[18px] m-0 border border-black">1
                    </button>
                    <button
                        onClick={() => {
                            setNum("")
                            if (inputRef.current !== null) {
                                inputRef.current.value = ""
                            }
                        }}
                        className="bg-green-700 text-white h-[36px] text-[18px] m-0 border border-black">C
                    </button>
                    <button
                        disabled={!checkOperators(num)}
                        onClick={() => setNum(calculateBinaryExpression(num))}
                        className="bg-green-700 text-white h-[36px] text-[18px] m-0 border border-black disabled:cursor-not-allowed">=
                    </button>
                    <button
                        disabled={["+", "-", "*", "/"].some(op => num.includes(op))}
                        onClick={() => {
                            appendBinaryDigit("+")
                        }}
                        className="bg-black text-red-700 h-[36px] text-[18px] m-0 border border-black disabled:cursor-not-allowed">+
                    </button>
                    <button
                        disabled={["+", "-", "*", "/"].some(op => num.includes(op))}
                        onClick={() => {
                            appendBinaryDigit("-")
                        }}
                        className="bg-black text-red-700 h-[36px] text-[18px] m-0 border border-black disabled:cursor-not-allowed">-
                    </button>
                    <button
                        disabled={["+", "-", "*", "/"].some(op => num.includes(op))}
                        onClick={() => {
                            appendBinaryDigit("*")
                        }}
                        className="bg-black text-red-700 h-[36px] text-[18px] m-0 border border-black disabled:cursor-not-allowed">*
                    </button>
                    <button
                        disabled={["+", "-", "*", "/"].some(op => num.includes(op))}
                        onClick={() => {
                            appendBinaryDigit("/")
                        }}
                        className="bg-black text-red-700 h-[36px] text-[18px] m-0 border border-black disabled:cursor-not-allowed">/
                    </button>
                </div>

            </div>
            </div>
        </>
    );
};

export default BinaryCalculator;
