import { Formik } from 'formik';

const SignInWrapper = () => {
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="input input-bordered w-full max-w-xs mt-3"
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className="input input-bordered w-full max-w-xs mt-3"
            />
            {errors.password && touched.password && errors.password}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn mt-3"
              >
                Sign in
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignInWrapper;
