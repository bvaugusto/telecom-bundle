import React, {Component} from 'react'
import Axios from 'axios'

import PageHeader from '../template/pageHeader';
import PackageList from './packageList'

const URL = 'http://127.0.0.1:3003/api/list-all-broadband'

export default class Package extends Component {

    constructor(props){
        super(props)
        
        this.state = {list: []}
        this.refresh()
    }

    refresh() {
        Axios.get(`${URL}`).then(resp => this.setState({...this.state, list: resp.data}))
    }

    render() {
        return (
            <div>
                <PageHeader 
                    name="Lista" 
                    small="Banda Larga">
                </PageHeader>
                
                <PackageList 
                    list={this.state.list} /> 
            </div>
        )
    }
}