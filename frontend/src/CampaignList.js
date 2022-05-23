import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class CampaignList extends Component {

    constructor(props) {
        super(props);
        this.state = {campaigns: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/campaigns')
            .then(response => response.json())
            .then(data => this.setState({campaigns: data}));
    }

    async remove(id) {
        await fetch(`/campaigns/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedCampaigns = [...this.state.campaigns].filter(i => i.id !== id);
            this.setState({campaigns: updatedCampaigns});
        });
    }

    render() {
        const {campaigns} = this.state;

        function refreshPage(){
            window.location.reload(false);
        }

        const campaignList = campaigns.map(campaign => {
            let status;
            if (campaign.status) {
                status = "ON";
            } else if (!(campaign.status)) {
                status = "OFF";
            }
            return <tr key={campaign.id}>
                <td style={{whiteSpace: 'nowrap'}}>{campaign.campaignName}</td>
                <td>{campaign.keywords}</td>
                <td>{campaign.bidAmount}</td>
                <td>{campaign.campaignFund}</td>
                <td>{status}</td>
                <td>{campaign.town}</td>
                <td>{campaign.radius}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} onClick={() => window.location.href="/campaigns/" + campaign.id} to={"/campaigns/" + campaign.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(campaign.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });


        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/campaigns/new" onClick={() => window.location.href="/campaigns/new"} >Add Campaign</Button>
                    </div>
                    <h3>Campaigns</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="12,5%">Campaign name</th>
                            <th width="12,5%">Keywords</th>
                            <th width="12,5%">Bid amount</th>
                            <th width="12,5%">Campaign fund</th>
                            <th width="12,5%">Status</th>
                            <th width="12,5%">Town</th>
                            <th width="12,5%">Radius (km)</th>
                            <th width="12,5%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {campaignList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default CampaignList;