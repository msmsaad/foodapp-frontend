import { Formik } from 'formik';

const SignupModal = () => {

  return(
    <dialog id="sign_up_modal" className="modal">
      <div className="modal-box">
        <div>
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              if (!values.name) {
                errors.name = 'Required';
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
                  type="text"
                  name="name"
                  placeholder='Name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className="input input-bordered w-full max-w-xs mt-3"
                />
                {errors.name && touched.name && errors.name}
                <input
                  type="email"
                  name="email"
                  placeholder='Email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="input input-bordered w-full max-w-xs mt-3"
                />
                {errors.email && touched.email && errors.email}
                <input
                  type="password"
                  name="password"
                  placeholder='Password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="input input-bordered w-full max-w-xs mt-3"
                />
                {errors.password && touched.password && errors.password}
                <div>
                  <button type="submit" disabled={isSubmitting} className="btn mt-3">
                    Sign Up
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
     
      </div>
    </dialog>)
};

export default SignupModal;