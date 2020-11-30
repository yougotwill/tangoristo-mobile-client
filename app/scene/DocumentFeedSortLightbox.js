/**
 * @flow
 */

import React from 'react';
import { SafeAreaView,  StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import documentFeedStore from '../store/DocumentFeedStore';

type Props = {}

type State = {}

const HIGHLIGHT_SORT_BACKGROUND_COLOR = '#f3d7a0';

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: 'rgba(52,52,52,0.8)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class DocumentFeedSearchLightbox extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
    }
  }

  onFilter(sortBy: string, sortAsc: boolean) {
    documentFeedStore.start = 0;
    documentFeedStore.sortBy = sortBy;
    documentFeedStore.sortAsc = sortAsc;
    documentFeedStore.search();
    Actions.pop();
  }

  getSortRow(title: string, sortBy: string, sortAsc: boolean) {
    const isSelected = documentFeedStore.sortBy === sortBy && documentFeedStore.sortAsc === sortAsc;
    const backgroundColor = isSelected ? HIGHLIGHT_SORT_BACKGROUND_COLOR : 'white';
    return (
      <TouchableOpacity
        style={{
          height: 50,
          width: 220,
          backgroundColor: backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 15,
          borderRadius: 25,
          marginBottom: 20
        }}
        onPress={() => this.onFilter(sortBy, sortAsc)}
      >
        <Text
          style={{
            fontSize: 20
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.shadow}
        onPress={() => Actions.pop()}
      >
        <SafeAreaView style={styles.container}>
          {this.getSortRow('Most recent', 'publication', false)}
          {this.getSortRow('Least recent', 'publication', true)}
          {this.getSortRow('Easier vocabulary', 'vocabulary_level_score', true)}
          {this.getSortRow('Complex vocabulary', 'vocabulary_level_score', false)}
        </SafeAreaView>
      </TouchableOpacity>
    )
  }

}