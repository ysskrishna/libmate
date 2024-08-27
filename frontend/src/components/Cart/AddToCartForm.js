import { useFormik } from 'formik';

export default function AddToCartForm({ book, onClose }) {
  const formik = useFormik({
    initialValues: {
      title: book.title,
      fromDate: '',
      toDate: '',
    },
    onSubmit: (values) => {
      console.log('Adding to cart:', values);
      onClose(); 
    },
  });

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl mb-4">Add "{book.title}" to Cart</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              readOnly
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">From Date</label>
            <input
              type="date"
              name="fromDate"
              onChange={formik.handleChange}
              value={formik.values.fromDate}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">To Date</label>
            <input
              type="date"
              name="toDate"
              onChange={formik.handleChange}
              value={formik.values.toDate}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
              Add to Cart
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
