"use client";

import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Dropdown from '@/components/Dropdown';
import { ROLE } from '@/common/constants';

export default function Login() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: ROLE.USER,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().required('Password is required'),
      role: Yup.string().oneOf([ROLE.USER, ROLE.ADMIN], 'Invalid Role').required('Role is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await axios.post('/api/auth/login', values);

        if (res.status === 200) {
          if (values.role === ROLE.USER) {
            router.push('/customerDashboard'); // Redirect to customer dashboard
          } else if (values.role === ROLE.ADMIN) {
            router.push('/admin-dashboard'); // Redirect to admin dashboard
          }
        }
      } catch (error) {
        console.error('Login failed', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
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
            <option value={ROLE.USER}>User</option>
            <option value={ROLE.ADMIN}>Admin</option>
          </Dropdown>
        </div>

        <Button
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </Button>

        <div className="mt-4 text-center">
          <a href="/signup" className="text-gray-500 hover:underline">
            Create a new account?
          </a>
        </div>
      </form>
    </div>
  );
}
