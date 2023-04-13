import React from 'react';
import { prettifyNumber } from '../../../utils/prettifyNumbers';
import styles from './Table.module.scss';

type PrimitiveType = string | symbol | number | boolean;

interface MinTableItem {
  id: PrimitiveType;
}

type TableHeaders<T extends MinTableItem> = Record<keyof T, string>;

type CustomRenderers<T extends MinTableItem> = Partial<
  Record<keyof T, (it: T) => React.ReactNode>
>;

function isPrimitive(value: unknown): value is PrimitiveType {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'symbol'
  );
}

interface TableProps<T extends MinTableItem> {
  items: T[];
  headers: TableHeaders<T>;
  onRowClick: (it: T) => void;
  customRenderers?: CustomRenderers<T>;
}

function getObjectValues<T extends object>(obj: T): Array<T[keyof T]> {
  return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
}

function getObjectKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj).map((objKey) => objKey as keyof T);
}

function prettifyValue(input: PrimitiveType): string {
  return !isNaN(Number(input))
    ? prettifyNumber(Number(input))
    : (input as string);
}

const Table = <T extends MinTableItem>(props: TableProps<T>): JSX.Element => {
  return (
    <table className={styles.table} data-testid='table'>
      <thead className={styles.tableHead}>
        <tr>
          {getObjectValues(props.headers).map((headerValue) => (
            <th key={headerValue}>{String(headerValue)}</th>
          ))}
        </tr>
      </thead>
      <tbody data-testid='table-body'>
        {props.items.map((row, rowIndex) => (
          <tr
            className={styles.tableRow}
            key={rowIndex}
            onClick={() => {
              props.onRowClick(row);
            }}
            data-testid='table-row'
          >
            {getObjectKeys(props.headers).map((itemProperty, index) => {
              const customRenderer = props.customRenderers?.[itemProperty];
              const dataLabel = getObjectValues(props.headers)[index];
              const key = rowIndex.toString() + index.toString();
              if (typeof customRenderer !== 'undefined') {
                return (
                  <td
                    data-label={dataLabel}
                    className={styles.tableCell}
                    key={key}
                  >
                    {customRenderer(row)}
                  </td>
                );
              }
              return (
                <td
                  data-label={dataLabel}
                  className={styles.tableCell}
                  key={key}
                >
                  {isPrimitive(row[itemProperty])
                    ? prettifyValue(row[itemProperty] as PrimitiveType)
                    : '-'}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
