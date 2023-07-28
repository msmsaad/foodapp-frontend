import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  requiredString,
  emailValidator,
  passwordValidator,
  passwordConfirmation,
  createPasswordValidator,
} from '@utils/validator';
import { INITIAL_SIGNIN_VALUES, INITIAL_SIGNUP_VALUES } from 'src/constants';
import ErrorMessage from '@components/common/Error';
import { toast } from 'react-toastify';
import { useSignInMutation, useSignUpMutation } from '@redux/api/authApi';
import { useModal } from '../Modal/useModal';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required(requiredString),
  email: emailValidator,
  password: createPasswordValidator,
  passwordConfirmation,
});

const SignInSchema = Yup.object().shape({
  email: emailValidator,
  password: passwordValidator,
});

interface FormValues {
  name?: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}

const AuthWrapper = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const [signIn, { isLoading: isSignInSubmitting }] = useSignInMutation();
  const [signUp, { isLoading: isSignUpSubmitting }] = useSignUpMutation();

  const { toggleModal } = useModal();

  const onSubmit = async (values: any) => {
    try {
      const _result = isSignUp
        ? await signUp(values).unwrap()
        : await signIn(values).unwrap();
      setIsSignUp(false);
      formik.resetForm();
      toast.success(`You have successfully signed ${isSignUp ? 'up' : 'In'}`);
      toggleModal('auth_modal');
    } catch (error) {
      console.log(error);
      toast.error('Unable to Authenticate');
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: isSignUp ? INITIAL_SIGNUP_VALUES : INITIAL_SIGNIN_VALUES,
    validationSchema: isSignUp ? SignUpSchema : SignInSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const { errors, touched, getFieldProps, handleSubmit, isValid, dirty } =
    formik;

  return (
    <div className="p-5">
      <div className="card bg-base-200">
        <div className="card-header text-center mt-4">
          <h2 className="text-lg">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        </div>
        <div className="divider" />
        <form className="card-body" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                placeholder="Username"
                className={`input input-bordered ${
                  errors.username && touched.username ? 'invalid' : ''
                }`}
                {...getFieldProps('name')}
              />
              {errors.username && touched.username && (
                <ErrorMessage text={errors.username} />
              )}
            </div>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              placeholder="Email"
              className={`input input-bordered ${
                errors.email && touched.email ? 'invalid' : ''
              }`}
              type="email"
              {...getFieldProps('email')}
            />
            {errors.email && touched.email && (
              <ErrorMessage text={errors.email} />
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className={`input input-bordered ${
                errors.password && touched.password ? 'invalid' : ''
              }`}
              {...getFieldProps('password')}
            />
            {errors.password && touched.password && (
              <ErrorMessage text={errors.password} />
            )}
          </div>
          {isSignUp && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className={`input input-bordered ${
                  errors.passwordConfirmation && touched.passwordConfirmation
                    ? 'invalid'
                    : ''
                }`}
                {...getFieldProps('passwordConfirmation')}
              />
              {errors.passwordConfirmation && touched.passwordConfirmation && (
                <ErrorMessage text={errors.passwordConfirmation} />
              )}
            </div>
          )}
          <div className="form-control mt-6">
            <button
              type="submit"
              disabled={
                !(isValid && dirty) || isSignUpSubmitting || isSignInSubmitting
              }
              className="btn btn-primary"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
            <div className="divider">OR</div>
            <button
              type="button"
              onClick={toggleSignUp}
              className="btn btn-ghost mt-4"
            >
              {isSignUp ? 'Sign In Instead' : 'Sign Up Instead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthWrapper;
