import { FlatList, View, StyleSheet, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Link } from 'react-router-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryListHeader = ({ search, setSearch, type, setType }) => {
  return (
    <>
      <TextInput
        style={{ backgroundColor: 'white', margin: 5 }}
        placeholder="Search"
        value={search}
        onChangeText={(target) => {
          setSearch(target);
        }}
      ></TextInput>
      <Picker
        selectedValue={type}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
      >
        <Picker.Item label="Newest" value={'newest'}></Picker.Item>
        <Picker.Item label="Highest" value={'highest'}></Picker.Item>
        <Picker.Item label="Lowest" value={'lowest'}></Picker.Item>
      </Picker>
    </>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <RepositoryListHeader
        search={props.search}
        setSearch={props.setSearch}
        type={props.type}
        setType={props.setType}
      />
    );
  };
  render() {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Link to={`${item.id}`}>
            <RepositoryItem item={item}></RepositoryItem>
          </Link>
        )}
        ListHeaderComponent={this.renderHeader}
        onEndReachedThreshold={0.5}
        onEndReached={this.props.onEndReach}
      />
    );
  }
}

export const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [type, setType] = useState('newest');
  const [search, setSearch] = useState('');
  const [searchKeyword] = useDebounce(search, 500);
  const { repositories, fetchMore } = useRepositories(type, searchKeyword);
  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      type={type}
      setType={setType}
      search={search}
      setSearch={setSearch}
      onEndReach={onEndReach}
    ></RepositoryListContainer>
  );
};

export default RepositoryList;
