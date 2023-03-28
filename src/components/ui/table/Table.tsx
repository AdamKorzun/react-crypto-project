import React from 'react';
import { prettyNumber } from '../../../utils/prettyNumbers';
import styles from './Table.module.scss';
type PrimitiveType = string | symbol | number | boolean;

interface MinTableItem {
  id: PrimitiveType;
}

type TableHeaders<T extends MinTableItem> = Record<keyof T, string>;

type CustomRenderers<T extends MinTableItem> = Partial<
  Record<keyof T, (it: T) => React.ReactNode>
>;

function isPrimitive(value: any): value is PrimitiveType {
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

function objectValues<T extends object>(obj: T): Array<T[keyof T]> {
  return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
}

function objectKeys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj).map((objKey) => objKey as keyof T);
}

function prettyValue(input: PrimitiveType): string {
  return !isNaN(Number(input))
    ? prettyNumber(Number(input))
    : (input as string);
}

const Table = <T extends MinTableItem>(props: TableProps<T>): JSX.Element => {
  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          {objectValues(props.headers).map((headerValue) => (
            <th key={headerValue}>{String(headerValue)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.items.map((row, rowIndex) => (
          <tr
            className={styles.row}
            key={rowIndex}
            onClick={() => {
              props.onRowClick(row);
            }}
          >
            {objectKeys(props.headers).map((itemProperty, index) => {
              const customRenderer = props.customRenderers?.[itemProperty];
              const dataLabel = objectValues(props.headers)[index];
              const key = rowIndex.toString() + index.toString();
              if (customRenderer != null) {
                return (
                  <td data-label={dataLabel} className={styles.cell} key={key}>
                    {customRenderer(row)}
                  </td>
                );
              }
              return (
                <td data-label={dataLabel} className={styles.cell} key={key}>
                  {isPrimitive(row[itemProperty])
                    ? prettyValue(row[itemProperty] as PrimitiveType)
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
