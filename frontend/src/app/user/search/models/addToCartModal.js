import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import Modal from '@/components/Modal';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { addBookToCart } from '@/redux/features/userCartSlice';


const AddToCartModal = ({show, onClose, book}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
        fromDate: '',
        toDate: '',
    },
    validationSchema: Yup.object({
        fromDate: Yup.date()
        .required('From date is required')
        .min(new Date(), 'From date must be today or later')
        .typeError('Invalid date format'),
        toDate: Yup.date()
        .required('To date is required')
        .min(Yup.ref('fromDate'), 'To date must be after From date')
        .typeError('Invalid date format'),
    }),
    onSubmit: (values) => {
        const bookWithDates = {...book, fromDate: values.fromDate, toDate: values.toDate}
        console.log(bookWithDates);
        dispatch(addBookToCart({book:bookWithDates}));
        formik.resetForm();
        onClose();
    },
  });
  
  return (
    <Modal show={show} onClose={onClose}>
        <h2 className="text-xl mb-4">Add "{book?.title}" to Cart</h2>
        
        <div className="mb-4">
            <InputField
                label="From Date"
                type="date"
                name="fromDate"
                value={formik.values.fromDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="From Date"
                errorMessage={formik.touched.fromDate && formik.errors.fromDate ? formik.errors.fromDate : null}
            />
        </div>


        <div className="mb-4">
            <InputField
                label="To Date"
                type="date"
                name="toDate"
                value={formik.values.toDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="To Date"
                errorMessage={formik.touched.toDate && formik.errors.toDate ? formik.errors.toDate : null}
            />
        </div>

        <Button
            onClick={formik.handleSubmit}
        >
            Add to Cart
        </Button>
        
    </Modal>
  );
};

export default AddToCartModal;