import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { service } from '../services/service';
import Button from '@material-ui/core/Button';
import XLSX from 'xlsx';
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  container: {
    maxHeight: 440,
  },
  content: {
    flexGrow: 1,
    position: 'relative',
    top: '100px'
  }
});


function Dashboard(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [loading,setLoading]=React.useState(true);
  const columns = [
    { id: 'name', label: 'Name', minWidth: '40%' },
    { id: 'email', label: 'Email' }
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const dataResponce = service.getUserList();
    dataResponce.then(async (response) => {
      if (response.success) {
        if (response.users && response.users.length > 0) {
          const setData = []
          response.users.forEach((data) => {
            setData.push({
              id: data._id,
              name: data.name,
              email: data.email
            })
          })
          setRows(setData)
          setLoading(false)
        } else {
          setRows([])
        }
      }
    });

  }, [])

  const downloadExcel = (event) => {
    // window.open('data:application/vnd.ms-excel,' + JSON.stringify(rows));
    // event.preventDefault();

    let binaryData = XLSX.utils.json_to_sheet(rows);
    const workBook = XLSX.utils.book_new();
    binaryData['!cols'] = [];
    binaryData['!cols'][0] = { hidden: true };
    XLSX.utils.book_append_sheet(workBook, binaryData, 'Binary values')
    XLSX.writeFile(workBook, 'exceldata.xlsx');
  } 

  const logoutApp=()=>{
    const dataResponce = service.logoutAPI();
    dataResponce.then(async (response) => {
        if (response.success) {
            await dispatch({
                type: "AUTHENTICATE",
                login:false
            })
            props.history.push('/login');
        }
    })
  }

  return (
    <div>
      <Header onLogout={()=>logoutApp()}/>
      {!loading?
      <main className={`${classes.content}`}>
        <Paper className="tableStyle">
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <div className="marginTop24 middle">
        <Button
          variant="contained" color="primary"
          onClick={(event) => downloadExcel(event)}
          test-button='button'>
          Download Excel
        </Button>
        </div>
      </main>:<div>Loading Data...</div>}
    </div>
  );
}

export default Dashboard;
