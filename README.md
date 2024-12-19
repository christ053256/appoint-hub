# New to this file

-   Database setup using firebase

# Tasks to Complete

-   [ ] Fetch Data
-   [ ] Remove Data
-   [x] Send Data

## If a problem occurs, please try the steps below

-   cd frontend
-   npm install react react-dom react-router-dom react-datepicker firebase
-   npm run dev or npx vite

## SCRAP CODES

    const [showModal, setShowModal] = useState(false); // State for modal visibility

const toggleModal = () => {
setShowModal(!showModal); // Toggle modal visibility
};

        <li>
                            <button className="admin" onClick={toggleModal}>
                                Admin
                            </button>
                        </li>


    {/* Admin Login Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <button className="close-button" onClick={toggleModal}>
                            X
                        </button>
                        <h2>Admin Login</h2>
                        <form className="login-form">
                            <div className="form-group">
                                <label htmlFor="admin-username">Username</label>
                                <input
                                    type="text"
                                    id="admin-username"
                                    name="username"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="admin-password">Password</label>
                                <input
                                    type="password"
                                    id="admin-password"
                                    name="password"
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            )}
