import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
    const blog = {
        title: 'Blue',
        author: 'BigBang',
        likes: '9384759823'
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    component.debug()

    // method 1
    expect(component.container).toHaveTextContent(
        'Blue', 'BigBang', '9384759823'
    )

    // method 2
    const element = component.getByText(
        'Blue BigBang'
    )
    expect(element).toBeDefined()

    // method 3
    const div = component.container.querySelector('.blogRender')
    expect(div).toHaveTextContent(
        'BigBang'
    )
})

test('clicking the button twice calls event handler twice', () => {
    const blog = {
        title: 'Blue',
        author: 'BigBang',
        likes: '9384759823'
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})