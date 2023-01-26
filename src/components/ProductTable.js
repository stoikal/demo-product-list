import PropTypes from 'prop-types'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import LinearProgress from '@mui/material/LinearProgress'

export default function ProductTable ({ items, pagination, onPaginationChange, loading }) {
  const handlePageChange = (e, page) => {
    onPaginationChange({
      limit: pagination.limit,
      skip: pagination.limit * page,
      totalCount: 0
    })
  }

  const handleRowsPerPageChange = (e) => {
    onPaginationChange({
      limit: e.target.value,
      skip: 0,
      totalCount: 0
    })
  }

  const page = (() => {
    return pagination.skip / pagination.limit
  })()

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
          {loading && (
            <tr>
              <td colSpan={5}>
                <LinearProgress />
              </td>
            </tr>
          )}
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              page={page}
              count={pagination.totalCount}
              rowsPerPage={pagination.limit}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              disabled
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

ProductTable.propTypes = {
  items: PropTypes.array,
  pagination: PropTypes.object,
  onPaginationChange: PropTypes.func,
  loading: PropTypes.bool
}
