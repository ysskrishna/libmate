"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Dropdown from '@/components/Dropdown';
import { Role } from '@/common/constants';
import Logo from '@/components/Logo';
import { selectIsLoading } from '@/redux/features/authSlice';
import { login } from '@/redux/api/authApi';


export default function Login() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: Role.USER,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().required('Password is required'),
      role: Yup.string().oneOf([Role.USER, Role.ADMIN], 'Invalid Role').required('Role is required'),
    }),
    onSubmit: (values) => {
      dispatch(login(values.role, {
        "email": values.email, 
        "password": values.password
      }));
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      
      <form className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <div className='mb-4 flex justify-center'>
          <Logo />
        </div>
        
        <div className="mb-4">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="abc@gmail.com"
            errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : null}
          />
        </div>

        <div className="mb-4">
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="•••••••••"
            errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : null}
          />
            
        </div>
        
        <div className="mb-4">
          <Dropdown
            label="Role"
            name="role"
            errorMessage={formik.touched.role && formik.errors.role ? formik.errors.role : null}
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value={Role.USER}>User</option>
            <option value={Role.ADMIN}>Admin</option>
          </Dropdown>
        </div>

        <Button
          onClick={formik.handleSubmit}
          isLoading={isLoading}
          buttonContainerClassName="w-full"
        >
          Login
        </Button>

        <div className="mt-4 text-center">
          <Link href="/register" className="text-gray-500 hover:underline">
            Create a new account?
          </Link>
        </div>
      </form>
    </div>
  );
}
