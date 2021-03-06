import React, { Component } from "react";
import { debounce } from 'throttle-debounce';
import './Search.css';
import {
  Label,
  Control,
  Input,
  Button,
  Panel,
  Modal,
  ModalCard,
  Container,
  ModalCardHeader,
  ModalCardBody,
  ModalCardFooter,
  ModalCardTitle,
  ModalBackground,
  PanelBlock,
} from "bloomer";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "", //(required)
      longitude: "", //(required)
      categories: "", //delimited strong of categories (optional)
      radius: "", //(optional)
      term: "", //(optional) -> search term 
      offset: "", //(optional)
      limit: "", //(optional)
      isActive: false,
      renderHasRun: false,
      runTotal: 0,
      autocomplete: [],
    };
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
	});
	this.yelpAutocompleteDebounced = debounce(50, this.yelpAutocomplete);
    this.suggestions = [];
  }

  updateSearch = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submit = (e) => {
    if (e !== undefined) { e.preventDefault(); } //event will never be undefined?
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
    // this.props.history.push(`latitude=${this.state.latitude}&
    //                         longitude=${this.state.longitude}&
    //                         categories=${this.state.categories}&
    //                         radius=${this.state.radius}&
    //                         term=${this.state.term}&
    //                         offset=${this.state.offset}&
    //                         limit=${this.state.limit}`);
    const {
      latitude,
      longitude,
      categories,
      radius,
      term,
      offset,
      limit
    } = this.state; 
    this.props.getTargets(
      latitude,
      longitude,
      categories,
      radius,
      term,
      offset,
      limit
    );
  };

  changeActive() {
    this.setState({ isActive: !this.state.isActive });
  }

  handleRadius = (e) => {
    e.preventDefault();
    let rad = e.target.value * 1609.344;
    if (rad > 40000) {
      rad = 40000;
    }
    this.setState({
      radius: Math.floor(rad)
    });
  };

  async yelpAutocomplete() {
    let yelpKey = `VxGmGdflQDo8ChLJQaQ4gQFBsJ_2qpGd74Xmvo72DGyAGLayLv20T6Q8snm2SIH_Q5dQ-8YQnLIfnomJQzxroI0TqR2mu6b2mF-Mo4en1WbdJgBv9Q01iHbDWpDyXXYx`; //our yelp api key

    let searchURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/autocomplete?";
    
    searchURL =
      searchURL + `text=${this.state.term}&latitude=${this.state.latitude}&longitude=${this.state.longitude}`; //appends everything.

    fetch(`${searchURL}`, {
      headers: { Authorization: "Bearer " + yelpKey }
    }).then(res => res.json())
      .then(data => {
        let pushing = [];
        if (data !== undefined && data.terms !== undefined && data.terms.length > 0) {
          for (let i = 0; i < data.terms.length; i++) {
            pushing.push(data.terms[i].text);
          }
		}
		this.suggestions = pushing;
      });
      //console.log(pushing)
  }

  onTextChanged() {
    if (this.state.term !== ""){
      this.yelpAutocompleteDebounced();
    }
  }

  renderSuggestions() {
    if (this.suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {this.suggestions.map((elt => 
			<li key={elt} onClick={() => {
				this.suggestionSelect(elt); 
				this.suggestions=[];
				}}>
				{elt}
			</li>))}
      </ul>
    )
  }

  suggestionSelect (value) {
    this.setState({term : value});
  }

  //need to add categories in this - combo box
  render() {
    if (!this.state.renderHasRun && this.state.longitude !== "" && this.state.latitude !== "") {
      this.submit();
      this.setState({
        renderHasRun: true
      });
    }

    return (
      <Container>
        <Button onClick={this.changeActive.bind(this)}>
          Choose your filter!
              </Button>
        <form onSubmit={this.submit}>
          <Modal isActive={this.state.isActive}>
            <ModalBackground />
            <ModalCard>
              <ModalCardHeader>
                <ModalCardTitle>Filters!</ModalCardTitle>
              </ModalCardHeader>
              <ModalCardBody>
                <Panel>
                  <PanelBlock>
                    <Label>Search Term</Label>
                    &nbsp; &nbsp;
                    <Control className='autocomplete'>
                      <Input
                        name="term"
                        type="text"
                        placeholder="Enter restaurant"
                        value={this.state.term}
                        onChange={(e) => {
                          this.updateSearch(e);
                          this.onTextChanged();
                        }}
                      ></Input>
                      {this.renderSuggestions()}
                    </Control>
                  </PanelBlock>
                  <PanelBlock>
                    <Label>Category</Label>
                    &nbsp; &nbsp; &nbsp;
                    <Control>
                      <Input
                        name="categories"
                        type="text"
                        placeholder="Enter Categories"
                        value={this.state.categories}
                        onChange={this.updateSearch}
                      ></Input>
                    </Control>
                  </PanelBlock>
                  <PanelBlock>
                    <Label>Search Radius</Label>
                    <Control>
                      <Input
                        name="radius"
                        type="text"
                        placeholder="Radius in miles"
                        onChange={this.handleRadius}
                      ></Input>
                    </Control>
                  </PanelBlock>
                  {/* <PanelBlock>
                    <Label>Offset Limit</Label>
                    <Control>
                      <Input
                        name="offset"
                        type="text"
                        placeholder="Offset the list of businesses"
                        onChange={this.updateSearch}
                      ></Input>
                    </Control>
                  </PanelBlock>
                  <PanelBlock>
                    <Label>Result Limit</Label>
                    <Control>
                      <Input
                        name="limit"
                        type="text"
                        placeholder="Limit"
                        onChange={this.updateSearch}
                      ></Input>
                    </Control>
                  </PanelBlock> */}
                </Panel>
              </ModalCardBody>
              <ModalCardFooter>
                <Button
                  isColor="primary"
                  type="submit"
                  onClick={this.changeActive.bind(this)}
                >
                  Search
              </Button>
                <Button
                  isColor="warning"
                  onClick={this.changeActive.bind(this)}
                >
                  Cancel
              </Button>
              </ModalCardFooter>
            </ModalCard>
          </Modal>
        </form>
      </Container>
    );
  }
}