import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { Category } from '@types';
import { Key } from 'react';
import Link from 'next/link';

const NavBar = () => {
  const { categories } = useSelector((state: RootState) => state.categories);

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
    <div className="navbar bg-base-100">
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
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
        <button className="btn" onClick={() => window.my_modal_1.showModal()}>
          Sign up
        </button>
        <button className="btn" onClick={() => window.my_modal_1.showModal()}>
          Sign in
        </button>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => window.my_modal_1.showModal()}
                >
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                <span>MX</span>
              </div>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
