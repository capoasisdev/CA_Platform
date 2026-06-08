import './Table.css';

/**
 * Table component
 * @param {Array} columns - [{ key, label, sortable, render }]
 * @param {Array} data    - array of row objects
 * @param {string} emptyMessage - shown when data is empty
 */
const Table = ({
  columns = [],
  data = [],
  emptyMessage = 'No data available',
  className = '',
}) => (
  <div className={`table-container ${className}`}>
    <table className="table">
      <thead className="table__head">
        <tr className="table__head-row">
          {columns.map((col) => (
            <th
              key={col.key}
              className={`table__th${col.sortable ? ' table__th--sortable' : ''}`}
            >
              <span className="table__th-inner">{col.label}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr className="table__empty-row">
            <td colSpan={columns.length}>{emptyMessage}</td>
          </tr>
        ) : (
          data.map((row, rowIdx) => (
            <tr key={row.id ?? rowIdx} className="table__body-row">
              {columns.map((col) => (
                <td key={col.key} className="table__td">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default Table;
