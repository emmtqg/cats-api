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
            // label="Search Breeds"
            name="searchBar" 
        >
          <SearchBar
            placeholderText="Narrow your selection of breeds here"
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
            >
              {/* Using a pipe for the option value to pass back the breed id and the name */}
              {breeds.map((breed) => {
                return (
                  <Option  
                    key={breed.id}
                    value={`${breed.id}|${breed.name}`}
                  >{breed.name}
                  </Option>
                )}
              )}
            </Select>
          </Form.Item>
      </Form>
    </>
  );
}

export default BreedFormFilter;
