import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { Category } from '@types';
import { Key } from 'react';
import Link from 'next/link';
import CartDrawer from "../CartDrawer/index"

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
       <CartDrawer/>
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
