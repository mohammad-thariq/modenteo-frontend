import React, { useState } from 'react';
import '../../styles/pagination.css';
import './category.css';
import ConfirmationPopup from './confirmationpopup';
import CategoryForm from './categoryform';
import { BiTrash, BiEdit } from 'react-icons/bi';
const CategoryTable = ({ data, itemsPerPage, type }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [deleteCategory, setDeleteCategory] = useState(null);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    let totalOrdersLength = data.length;
    const totalPages = Math.ceil(totalOrdersLength / itemsPerPage);
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        const halfMaxPages = Math.floor(maxPagesToShow / 2);
        let startPage, endPage;
        if (totalPages <= maxPagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage <= halfMaxPages) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPage + halfMaxPages >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - halfMaxPages;
            endPage = currentPage + halfMaxPages;
        }
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };
    const pageNumbers = getPageNumbers();

    const getCattype = (type) => {
        let categorytype = '';
        switch (type) {
            case 'all':
                categorytype = 'All Orders';
                break;
            case 'recent':
                categorytype = 'Recent Orders';
                break;
            case 'category':
                categorytype = 'All Categories';
                break
            default:
                categorytype = 'Orders';
                break

        }
        return categorytype;
    }
    const openModal = (category = null) => {
        setModalIsOpen(true);
        setEditCategory(category);

    };

    const closeModal = () => {
        setEditCategory(null);
        setModalIsOpen(false);
    };
    const handleDelete = async () => {
        // await axios.delete(`/api/categories/${deleteCategory.id}`);
        // fetchCategories();
        setDeleteCategory(null);
    };

    const handleSave = async (category) => {
        // if (editCategory) {
        //     await axios.put(`/api/categories/${editCategory.id}`, category);
        // } else {
        //     await axios.post('/api/categories', category);
        // }
        // fetchCategories();
        closeModal();
    };


    return (
        <div>
            <div className='header-category'>
                <h4 className="card-title">{getCattype(type)}</h4>
                <button type="button" className='btn btn-primary' onClick={() => openModal()}>Add Category</button>
            </div>
            {modalIsOpen && <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className='modal-header'>
                        <h4>{editCategory != null ? "Edit " : "Add "} Category</h4>
                    </div>
                    <span className="close" onClick={() => closeModal()}>&times;</span>
                    <CategoryForm onSave={handleSave} category={editCategory} />
                </div>
            </div>}
            {deleteCategory && (
                <ConfirmationPopup
                    message={`Are you sure you want to delete ${deleteCategory.name}?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteCategory(null)}
                />
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th> Category ID </th>
                        <th> Category Name </th>
                        <th> Category Image </th>
                        <th> Status </th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td> {item.id} </td>
                            <td>{item.name} </td>
                            <td>{item.image} </td>
                            <td>
                                <label className={`badge badge-gradient-${item?.status}`}>{item.status}</label>
                            </td>
                            <td className='actions-order'>
                                <BiEdit onClick={() => openModal(item)} />
                                <BiTrash onClick={() => setDeleteCategory(item)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-container">
                {/* Pagination */}
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button onClick={() => paginate(1)} className="page-link">
                            First
                        </button>
                    </li>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button onClick={() => paginate(currentPage - 1)} className="page-link">
                            Previous
                        </button>
                    </li>
                    {pageNumbers.map((number) => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <button onClick={() => paginate(number)} className="page-link">
                                {number}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button onClick={() => paginate(currentPage + 1)} className="page-link">
                            Next
                        </button>
                    </li>
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button onClick={() => paginate(totalPages)} className="page-link">
                            Last
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CategoryTable;
