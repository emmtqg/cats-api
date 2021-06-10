import React from 'react'
import 'antd/dist/antd.css';
import '../index.css';
import { Form, Select } from 'antd';
import SearchBar from './SearchBar';

const BreedFormFilter = ({ breeds, handleChange, onChangeSearchQuery }) => {

  const { Option } = Select;

  return (
    <>
      <Form 
        layout="inline"
        name="herd-cats"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
            label="Search "
            name="searchBar"
            colon={false} 
        >
          <SearchBar
            placeholderText="Narrow your selection"
            onChangeSearchQuery={onChangeSearchQuery}
          />
        </Form.Item>

        <Form.Item
          label="Breeds "
          colon={false}
          name="breedTypes" 
          >
            <span role="img" aria-label="Cat icon">🐾 </span>

            <Select 
              style={{ width: '12rem' }}
              onChange={handleChange}
              placeholder="Select a breed"
            >
              {/* Using a pipe for the option value to pass back the breed id and the name */}
              {breeds.map((breed, i) => {
                return (
                  <Form.Item key={`${breed.id}fItem`} name={`option${i}`} noStyle>
                  <Option  
                    key={breed.id}
                    value={`${breed.id}|${breed.name}`}
                  >
                    {breed.name}
                  </Option>
                  </Form.Item>
                )}
              )}
            </Select>
          </Form.Item>
      </Form>
    </>
  );
}

export default BreedFormFilter;
