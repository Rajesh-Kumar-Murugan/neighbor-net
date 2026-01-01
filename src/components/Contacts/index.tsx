import {
  Button,
  Center,
  Group,
  keys,
  MultiSelect,
  ScrollArea,
  Space,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSearch, IconSelector } from '@tabler/icons-react';
import { useState } from 'react';
import classes from './styles.module.css';

interface RowData {
  id: number;
  name: string;
  contact: string[];
  company: string;
  categories: string[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="md">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(String(a[sortBy]));
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]));
    }),
    payload.search
  );
}

const data: RowData[] = [
  {
    id: 1,
    name: 'Athena Weissnat',
    company: 'Little - Rippin',
    contact: ['+1 456 345 6789', '+1 123 456 7890'],
    categories: ['Handyman', 'Electrician'],
  },
  {
    id: 2,
    name: 'Test User1',
    company: 'Conpany 432',
    contact: ['+1 456 564 6789'],
    categories: ['Handyman'],
  },
  {
    id: 3,
    name: 'Random 4',
    company: 'Little - Rippin',
    contact: ['+1 456 345 6789'],
    categories: ['Electrician'],
  },
  {
    id: 4,
    name: 'Golden State',
    company: 'Little - Rippin',
    contact: ['+1 456 345 6789'],
    categories: ['Handyman'],
  },
  {
    id: 5,
    name: 'test user 5',
    company: 'Little - Rippin',
    contact: ['+1 456 345 6789'],
    categories: ['Handyman', 'Electrician'],
  },
  {
    id: 6,
    name: 'Test user 6',
    company: 'Little - Rippin',
    contact: ['+1 456 345 6789'],
    categories: ['Cleaner'],
  },
  {
    id: 7,
    name: 'Test user 7',
    company: 'Little - Rippin',
    contact: ['+1 456 345 6789'],
    categories: ['Plumber'],
  },
  {
    id: 8,
    name: 'Test user 8',
    company: 'Little - Rippin',
    contact: ['+1 456 345 6789'],
    categories: ['Handyman', 'Electrician'],
  },
  {
    id: 9,
    name: 'Test user 9',
    company: 'Little - Rippin',
    contact: ['+1 456 345 6789'],
    categories: ['Plumber'],
  }, {
    id: 10,
    name: 'Test uswr 10',
    company: 'Little - Rippin',
    contact: ['+1 456 345 6789'],
    categories: ['Electrician'],
  },
  {
    id: 11,
    name: 'Last user 11',
    company: 'Little - Rippin',
    contact: ['+1 456 345 6789'],
    categories: ['Handyman'],
  }, {
    id: 12,
    name: 'First uswer 12',
    company: 'Little - Rippin',
    contact: ['+1 456 345 6789'],
    categories: ['Plumber', 'Electrician'],
  }, {
    id: 13,
    name: 'Middle User 13',
    company: 'Little - Rippin',
    contact: ['+1 456 345 6789'],
    categories: ['Plumber'],
  }, {
    id: 14,
    name: 'Old uswer 34',
    company: 'Little - Rippin',
    contact: ['+1 456 345 6789'],
    categories: ['Cleaner'],
  }, {
    id: 15,
    name: 'Test Number 14',
    company: 'Little - Rippin',
    contact: ['+1 456 345 6789'],
    categories: [],
  },
];

const categories = [
  { value: 'Handyman', label: 'Handyman' },
  { value: 'Electrician', label: 'Electrician' },
  { value: 'Plumber', label: 'Plumber' },
  { value: 'Cleaner', label: 'Cleaner' },
];

export function ContactsTable() {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const getFilteredDataByCategories = (categories: string[]) => {
    return data.filter((item) =>
      categories.length === 0 ? true : categories.every((val) => item.categories.includes(val))
    );
  };

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    const categoryFilteredData = getFilteredDataByCategories(selectedCategories);
    setSortedData(sortData(categoryFilteredData, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    const categoryFilteredData = getFilteredDataByCategories(selectedCategories);
    setSortedData(sortData(categoryFilteredData, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const handleCategoriesChange = (values: string[]) => {
    setSelectedCategories(values);
    const filteredData = getFilteredDataByCategories(values);
    setSortedData(sortData(filteredData, { sortBy, reversed: reverseSortDirection, search }));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.name} ta="left">
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>
        {row.contact.map((contact, index) => (
          <><Text
            key={index}
            fw={500}
            c="blue"
            component="a"
            href={`tel:${contact}`}
            className={classes.contactLink}
          >
            {contact}
          </Text>
            <Space h="xs" />
          </>
        ))}
      </Table.Td>
      <Table.Td>{row.company}</Table.Td>
      <Table.Td>{row.categories.join(', ')}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <Group mb="md" gap="lg" justify="space-between" grow>
        <MultiSelect
          placeholder="Select categories"
          data={categories}
          value={selectedCategories}
          onChange={handleCategoriesChange}
          clearable
          searchable
        />
        <TextInput
          placeholder="Search by any field"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Button onClick={() => { }}>Add Contact</Button>

      </Group>
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed" stickyHeader>
        <Table.Tbody color="">
          <Table.Tr>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'contact'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('contact')}
            >
              Contact
            </Th>
            <Th
              sorted={sortBy === 'company'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('company')}
            >
              Company
            </Th>
            <Th
              sorted={sortBy === 'categories'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('categories')}
            >
              Categories
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

export default ContactsTable;