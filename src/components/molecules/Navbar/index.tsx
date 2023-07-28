import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { Category } from '@types';
import { Key } from 'react';
import Link from 'next/link';
import CartDrawer from '../CartDrawer/index';
import Modal from '../Modal/Modal';
import { useModal } from '../Modal/useModal';
import AuthWrapper from '../AuthWrapper';
import { getInitials } from '@utils/index';
import { useSignOutMutation } from '@redux/api/authApi';
import { useGetCartQuery } from '@redux/api';

const NavBar = () => {
  const { categories } = useSelector((state: RootState) => state.categories);
  const { user } = useSelector((state: RootState) => state.session);
  const { toggleModal } = useModal();
  const [signOut] = useSignOutMutation();
  const { data } = useGetCartQuery();

  const renderCategoriesDropdown = () => {
    return categories.map((category: Category, index: Key) => (
      <li key={index}>
        <Link href={`/category/${category.strCategory}/meals`}>
          {category.strCategory}
        </Link>{' '}
      </li>
    ));
  };

  return (
    <div className="navbar bg-base-100 px-16">
      <Modal id="auth_modal">
        <AuthWrapper />
      </Modal>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Food App</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost rounded-btn">
            Categories
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-50 p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            {renderCategoriesDropdown()}
          </ul>
        </div>
        {!user && (
          <button className="btn" onClick={() => toggleModal('auth_modal')}>
            Sign in
          </button>
        )}
        {user && (
          <>
            <CartDrawer />
            <div className="dropdown dropdown-end">
              <label tabIndex={0}>
                <div className="avatar online placeholder cursor-pointer">
                  <div className="bg-slate-400 text-neutral-content rounded-full w-10">
                    <span className="text-sm">
                      {user.name ? getInitials(user.name) : 'MA'}
                    </span>
                  </div>
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li onClick={() => signOut()}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
