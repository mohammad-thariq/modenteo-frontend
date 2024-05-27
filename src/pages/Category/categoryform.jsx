import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CategoryForm = ({ onSave, category }) => {
  const initialValues = {
    name: '',
    image: '',
    status: 'active'
  };

  useEffect(() => {
   
  }, [category]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Category Name is required'),
    image: Yup.string().required('Category Image is required'),
    status: Yup.string().oneOf(['active', 'inactive']).required('Status is required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    onSave(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ name: category?.name, image: category?.image, status: category?.status }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form>
          <div className='row form-modal'>
            <div className="form-group">
              <label>Category Name</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage className='error' name="name" component="div" />
            </div>
            <div className="form-group">
              <label>Category Image</label>
              <Field type="text" name="image" className="form-control" />
              <ErrorMessage className='error' name="image" component="div" />
            </div>
          </div>
          <div className="form-group">
            <label>Status</label>
            <Field as="select" name="status" className="form-control" >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Field>
            <ErrorMessage className='error' name="status" component="div" />
          </div>
          <button className='btn btn-primary' type="submit" disabled={isSubmitting}>
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;
