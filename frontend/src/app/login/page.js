"use client";

import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

export default function Login() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: 'User',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().required('Password is required'),
      role: Yup.string().oneOf(['User', 'Admin'], 'Invalid Role').required('Role is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await axios.post('/api/auth/login', values);

        if (res.status === 200) {
          if (values.role === 'User') {
            router.push('/customerDashboard'); // Redirect to customer dashboard
          } else if (values.role === 'Admin') {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email"
            className={`w-full p-3 border rounded text-gray-600 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Password"
            className={`w-full p-3 border rounded text-gray-600 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <select
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-3 border rounded text-gray-600 ${formik.touched.role && formik.errors.role ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          {formik.touched.role && formik.errors.role ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.role}</div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-purple-500 text-white p-3 rounded hover:bg-purple-600 transition duration-200"
        >
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <div className="mt-4 text-center">
          <a href="/signup" className="text-gray-500 hover:underline">
            Create a new account?
          </a>
        </div>
      </form>
    </div>
  );
}
