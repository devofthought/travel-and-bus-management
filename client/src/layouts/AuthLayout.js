import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import { useRouter } from 'next/router';

const AuthLayout = ({ children }) => {
    const router = useRouter();
    const [radioOption, setRadioOption] = useState('login');

    const onChange = ({ target: { value } }) => {
        console.log('radio checked', value);
        setRadioOption(value);
    };

    useEffect(() => {
        if (radioOption === 'login') {
            router.push('/login');
        } else {
            router.push('/signup');
        }
    }, [radioOption]);

    const options = [
        {
        label: 'Login',
        value: 'login',
        },
        {
        label: 'Register',
        value: 'register',
        }
    ];

    return (
        <div className='flex justify-center min-h-screen bg-slate-600'>
            <div className='grid justify-center my-12 p-24 bg-slate-50 border-solid border-2 border-slate-900'>
            <Radio.Group
                className='flex justify-center mb-10'
                options={options}
                onChange={onChange}
                value={radioOption}
                optionType="button"
                buttonStyle="solid"
            />
                {children}
            </div>
    </div>
  );
};

export default AuthLayout;
