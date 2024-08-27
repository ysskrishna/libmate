"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Signup() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'User',
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
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/api/auth/signup', {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          role: values.role,
        });

        if (res.status === 201) {
          router.push('/login');
        }
      } catch (error) {
        console.error('Signup failed', error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full"
      >
        <input
          type="text"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Full Name"
          required
          className={`w-full p-3 mb-4 border rounded text-gray-600 ${formik.touched.fullName && formik.errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
        />
        {formik.touched.fullName && formik.errors.fullName ? (
          <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
        ) : null}

        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
          required
          className={`w-full p-3 mb-4 border rounded text-gray-600 ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}

        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
          required
          className={`w-full p-3 mb-4 border rounded text-gray-600 ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}

        <input
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Confirm Password"
          required
          className={`w-full p-3 mb-4 border rounded text-gray-600 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
        ) : null}

        <select
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-3 mb-4 border rounded text-gray-600 ${formik.touched.role && formik.errors.role ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        {formik.touched.role && formik.errors.role ? (
          <div className="text-red-500 text-sm">{formik.errors.role}</div>
        ) : null}

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition duration-200"
        >
          Signup
        </button>
        <div className="mt-4 text-center">
          <a href="/login" className="text-gray-500 hover:underline">
            Already have an account? Login
          </a>
        </div>
      </form>
    </div>
  );
}
