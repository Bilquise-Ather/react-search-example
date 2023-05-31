import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBTable,
  MDBTableHead,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBTableBody,
  MDBBtn,
  MDBBtnGroup,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from 'mdb-react-ui-kit';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(2);

  useEffect(() => {
    loadUsersData(currentPage, dataPerPage);
  }, [currentPage]);

  const loadUsersData = async (currentPage, dataPerPage) => {
    try {
      const response = await axios.get(
        `https://usersearch.onrender.com/?page=${currentPage}&limit=${dataPerPage}`
      );

      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://usersearch.onrender.com/search?name=${value}`
      );
      setData(response.data.data);
      setValue('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    try {
      const response = await axios.get(
        `https://usersearch.onrender.com/search?name=${inputValue}`
      );
      setSuggestions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleInputChange = (e) => {
  //   const inputValue = e.target.value;
  //   setValue(inputValue);

  //   setSuggestions([]); // Clear suggestions

  //   if (inputValue.trim() !== '') {
  //     // Perform search only if the input value is not empty
  //     performSearch(inputValue);
  //   } else {
  //     loadUsersData(1, dataPerPage); // Load all data if the input value is empty
  //   }
  // };

  // const performSearch = async (inputValue) => {
  //   try {
  //     const response = await axios.get(
  //       `https://usersearch.onrender.com/search?name=${inputValue}`
  //     );
  //     setData(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleReset = () => {
    setValue('');
    setSuggestions([]);
    loadUsersData(currentPage, dataPerPage);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <MDBContainer>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search Name"
          value={value}
          onChange={handleInputChange}
        />
        <MDBBtn type="submit" color="dark">
          Search
        </MDBBtn>
        <MDBBtn className="mx-2" color="info" onClick={handleReset}>
          Reset
        </MDBBtn>
      </form>

      <ul style={{ listStyleType: 'none' }}>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion.name}</li>
        ))}
      </ul>

      <div style={{ marginTop: '100px' }}>
        <h2>Search, Filter and Pagination</h2>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Position</th>
                  <th scope="col">Office</th>
                  <th scope="col">Extension</th>
                  <th scope="col">Start Date</th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className="align-center mb-0">
                  <tr>
                    <td colSpan={6} className="text-center mb-0">
                      No Data Found
                    </td>
                  </tr>
                </MDBTableBody>
              ) : (
                data.map((item, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.position}</td>
                      <td>{item.office}</td>
                      <td>{item.extn}</td>
                      <td>{item.start_date}</td>
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>

        <div
          style={{
            margin: 'auto',
            padding: '15px',
            maxWidth: '250px',
            alignContent: 'center',
          }}
        ></div>
        <PaginationControl
          page={currentPage}
          between={4}
          total={10}
          limit={dataPerPage}
          changePage={(page) => {
            setCurrentPage(page);
            console.log(page);
          }}
          ellipsis={1}
        />
      </div>
    </MDBContainer>
  );
}

export default App;
