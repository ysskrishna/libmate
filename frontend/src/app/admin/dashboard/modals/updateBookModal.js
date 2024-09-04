import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Dropdown from '@/components/Dropdown';
import { updateBook } from '@/redux/api/booksApi';
import { selectIsLoading } from '@/redux/features/booksSlice';
import { BookGenre } from '@/common/constants';


const UpdateBookModal = ({show, onClose, book}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const formik = useFormik({
    initialValues: {
      title: book?.title,
      description: book?.description,
      author: book?.author,
      genre: book?.genre,
      publishDate: book?.publish_date,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      author: Yup.string().required('Author is required'),
      genre: Yup.string().required('Genre is required'),
      publishDate: Yup.date()
        .required('Publish date is required')
        .typeError('Invalid date format'),
    }),
    onSubmit: (values) => {
      dispatch(updateBook(
        book?.book_id,
        {
        "title": values?.title,
        "author": values?.author,
        "description": values?.description,
        "genre": values?.genre,
        "publish_date": values?.publishDate
      }, () => onClose()));
    },
  });
  
  return (
    <Modal show={show} onClose={onClose}>
        <h2 className="text-xl mb-4">Update Book</h2>
        
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
              buttonContainerClassName="w-full"
            >
              Update book
            </Button>
        
    </Modal>
  );
};

export default UpdateBookModal;