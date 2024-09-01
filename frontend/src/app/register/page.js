"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Dropdown from '@/components/Dropdown';
import { ROLE } from '@/common/constants';
import Logo from '@/components/Logo';
import { selectIsLoading } from '@/redux/features/authSlice';
import { register } from '@/redux/api/authApi';


export default function Register() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: ROLE.USER,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      role: Yup.string().required('Role is required'),
    }),
    onSubmit: (values) => {
      dispatch(register(values.role, {
        "email": values.email, 
        "password": values.password,
        "name": values.fullName,
      }));
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full"
      >
        <div className='mb-4 flex justify-center'>
          <Logo />
        </div>
        <div className="mb-4">
          <InputField
            label="Full Name"
            type="text"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="John Doe"
            errorMessage={formik.touched.fullName && formik.errors.fullName ? formik.errors.fullName : null}
          />
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
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="•••••••••"
            errorMessage={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}
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
            <option value={ROLE.USER}>User</option>
            <option value={ROLE.ADMIN}>Admin</option>
          </Dropdown>
        </div>

        
        <Button
          onClick={formik.handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Signup'}
        </Button>
        <div className="mt-4 text-center">
          <a href="/login" className="text-gray-500 hover:underline">
            Already have an account? Login
          </a>
        </div>
      </form>
    </div>
  );
}
