import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'
import _ from 'lodash'

const tasks = [];
let index = 0;

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = { description: '', list: [] }

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleRemove = this.handleRemove.bind(this)

        this.refresh()
    }

    refresh(description = '') {
        this.setState({...this.state, description, list: tasks})
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleChange(e) {
        this.setState({...this.state, description: e.target.value })
    }

    handleAdd() {
        const description = this.state.description
        tasks.push({_id: index, description, done: false})
        index++
        this.refresh()
    }

    handleRemove(todo) {
        const index = tasks.findIndex(obj => {
            return obj._id === todo._id
        })
        tasks.splice(index, 1)
        this.refresh()
    }
    
    handleMarkAsDone(todo) {
        const index = tasks.findIndex(obj => {
            return obj._id === todo._id
        })
        tasks[index].done = true
        this.refresh()
    }

    handleMarkAsPending(todo) {
        const index = tasks.findIndex(obj => {
            return obj._id === todo._id
        })
        tasks[index].done = false
        this.refresh()
    }

    handleClear() {
        this.refresh()
    }

    render() {
        return (
            <div>
                <PageHeader name='Tasks Viceri' small='Register'></PageHeader>
                <TodoForm 
                    description={this.state.description}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd} 
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear} />
                <TodoList 
                    list={this.state.list}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    handleRemove={this.handleRemove} />
            </div>
        )
    }
}