"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Role, BookGenre } from '@/common/constants';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Dropdown from '@/components/Dropdown';
import CommonLayout from '@/components/Layout/commonLayout';
import { createNewBook  } from '@/redux/api/booksApi';
import { selectIsLoading } from '@/redux/features/booksSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';


const BookNew = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const router = useRouter();

  const handleSuccessCallback = () => {
    formik.resetForm();
    router.push('/admin/dashboard');
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      author: '',
      genre: '',
      totalCopies: '',
      publishDate: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      author: Yup.string().required('Author is required'),
      genre: Yup.string().required('Genre is required'),
      totalCopies: Yup.number()
        .required('Total copies is required')
        .typeError('Total copies must be a number'),
      publishDate: Yup.date()
        .required('Publish date is required')
        .typeError('Invalid date format'),
    }),
    onSubmit: (values) => {
      dispatch(createNewBook({
        "title": values?.title,
        "author": values?.author,
        "description": values?.description,
        "genre": values?.genre,
        "publish_date": values?.publishDate,
        "total_copies": values?.totalCopies,
        "available_copies": values?.totalCopies
      }, handleSuccessCallback));
    },
  });

  return (
    <CommonLayout allowedRoles={[Role.ADMIN]}>      
      <div className='flex-1 p-3 mb-3'>
        <div className="flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
            <div className="mb-4">
              <InputField
                label="Title"
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Title"
                errorMessage={formik.touched.title && formik.errors.title ? formik.errors.title : null}
              />
            </div>

            <div className="mb-4">
              <InputField
                label="Description"
                type="text"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Description"
                errorMessage={formik.touched.description && formik.errors.description ? formik.errors.description : null}
              />
            </div>

            <div className="mb-4">
              <InputField
                label="Author"
                type="text"
                name="author"
                value={formik.values.author}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Author"
                errorMessage={formik.touched.author && formik.errors.author ? formik.errors.author : null}
              />
            </div>

            <div className="mb-4">
              <Dropdown
                label="Genre"
                name="genre"
                errorMessage={formik.touched.genre && formik.errors.genre ? formik.errors.genre : null}
                value={formik.values.genre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="" label="Select genre" />
                {Object.keys(BookGenre).map((key) => (
                  <option key={key} value={BookGenre[key]}>
                    {BookGenre[key]}
                  </option>
                ))}
              </Dropdown>
            </div>

            <div className="mb-4">
              <InputField
                label="Total Copies"
                type="text"
                name="totalCopies"
                value={formik.values.totalCopies}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Total Copies"
                errorMessage={formik.touched.totalCopies && formik.errors.totalCopies ? formik.errors.totalCopies : null}
              />
            </div>

            <div className="mb-4">
              <InputField
                label="Publish Date"
                type="date"
                name="publishDate"
                value={formik.values.publishDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Publish Date"
                errorMessage={formik.touched.publishDate && formik.errors.publishDate ? formik.errors.publishDate : null}
              />
            </div>

            <Button
              onClick={formik.handleSubmit}
              isLoading={isLoading}
            >
              Add book
            </Button>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default BookNew;