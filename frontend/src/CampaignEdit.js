import React, {Component, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Typeahead } from 'react-bootstrap-typeahead';

class CampaignEdit extends Component {

    emptyItem = {
        campaignName: '',
        keywords: '',
        bidAmount: '',
        campaignFund: '',
        status: '',
        town: '',
        radius: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const campaign = await (await fetch(`/campaigns/${this.props.match.params.id}`)).json();
            this.setState({item: campaign});
        }
    }

    handleChange(event) {
        let item;
        if(Array.isArray(event)){
            const name = "keywords";
            const value = event[0];
            item = {...this.state.item};
            item[name] = value;
        } else {
            const target = event.target;
            const value = target.value;
            const name = target.name;
            item = {...this.state.item};
            item[name] = value;
        }

        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/campaigns' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/campaigns');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Campaign' : 'Add Campaign'}</h2>;

            return <div>
                <AppNavbar/>
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="campaignName">Campaign name</Label>
                            <Input type="text" name="campaignName" id="campaignName" value={item.campaignName || ''}
                                   onChange={this.handleChange} autoComplete="campaignName"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="keywords">Keywords</Label>
                            <Typeahead class="keywords" type="text" name="keywords" id="keywords" value={item.keywords || ''}
                                           onChange={this.handleChange} autoComplete="keywords"
                                options={["test1","test2","test3","keyword"]}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="bidAmount">Bid amount</Label>
                            <Input type="number" name="bidAmount" id="bidAmount" value={item.bidAmount || ''}
                                   onChange={this.handleChange} autoComplete="bidAmount"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="campaignFund">Campaign fund</Label>
                            <Input type="number" name="campaignFund" id="campaignFund" value={item.campaignFund || ''}
                                   onChange={this.handleChange} autoComplete="campaignFund"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="status">Status</Label><br/>
                            <select className="select" name="status" id="status" value={item.status || ''}
                                    onChange={this.handleChange} autoComplete="status">
                                <option defaultValue="none" value="none">Select status</option>
                                <option value="true">ON</option>
                                <option value="false">OFF</option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="town">Town</Label><br/>
                            <select className="select" name="town" id="town" value={item.town || ''}
                                    onChange={this.handleChange} autoComplete="town">
                                <option defaultValue="none" value="none">Select town</option>
                                <option value="Cracow">Cracow</option>
                                <option value="Warsaw">Warsaw</option>
                                <option value="Gdansk">Gdansk</option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="radius">Radius (km)</Label>
                            <Input type="number" name="radius" id="radius" value={item.radius || ''}
                                   onChange={this.handleChange} autoComplete="radius"/>
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit" onClick={() => {
                                window.location.reload(false)
                            }}>Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/campaigns" onClick={() => {
                                window.location.href = "/campaigns"
                            }}>Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        }
    }


export default withRouter(CampaignEdit);