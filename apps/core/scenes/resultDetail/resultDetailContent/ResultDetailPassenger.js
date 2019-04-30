// @flow

import * as React from 'react';
import { PassengerCards } from '@kiwicom/margarita-components';
import { createFragmentContainer, graphql } from '@kiwicom/margarita-relay';

import type { ResultDetailPassenger_itinerary as ResultDetailPassengerType } from './__generated__/ResultDetailPassenger_itinerary.graphql';
import PassengerForm from '../../../components/passengerForm/PassengerForm';

type Props = {|
  +itinerary: ?ResultDetailPassengerType,
|};

type State = {|
  +isFormVisible: boolean,
|};

// @TODO - temp passengers info, load default values from user profile or set empty for uregistered
const passengerCards = [
  {
    name: 'John Doe',
    gender: 'male',
    nationality: 'Russian',
    dateOfBirth: '22/04/1980',
    id: 'DF45SV8',
    insurance: 'Travel Insurance Name',
    passengerCount: 1,
    bags: [
      { count: 2, type: '40x15x30cm, 3kg' },
      { count: 1, type: '55x20x40cm, 8kg' },
    ],
  },
  {
    name: 'Jana Nováková',
    gender: 'female',
    nationality: 'Czech',
    dateOfBirth: '22/04/1984',
    id: 'DF45SV9',
    insurance: 'Travel Insurance Name',
    passengerCount: 1,
    bags: [{ count: 1, type: '40x15x30cm, 3kg' }],
  },
];

class ResultDetailPassenger extends React.Component<Props, State> {
  state = {
    isFormVisible: false,
  };

  handleFormCloseRequest = () => {
    this.setState({ isFormVisible: false });
  };

  handleEditPassenger = (id: ?string) => {
    // @TODO
    console.log('TODO: Edit passenger', id); // eslint-disable-line no-console
    this.setState({ isFormVisible: true });
  };

  handleAddPassenger = () => {
    // @TODO
  };

  render() {
    return (
      <>
        <PassengerCards
          passengerCards={passengerCards}
          onActionPress={this.handleEditPassenger}
          actionIconName="edit"
          onAddPassengerPress={this.handleAddPassenger}
        />
        <PassengerForm
          isVisible={this.state.isFormVisible}
          onRequestClose={this.handleFormCloseRequest}
          itinerary={this.props.itinerary}
        />
      </>
    );
  }
}

export default createFragmentContainer(ResultDetailPassenger, {
  itinerary: graphql`
    fragment ResultDetailPassenger_itinerary on ItineraryInterface {
      ...PassengerForm_itinerary
    }
  `,
});