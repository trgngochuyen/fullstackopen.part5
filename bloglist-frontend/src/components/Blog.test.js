import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
    const blog = {
        title: 'Blue',
        author: 'BigBang',
        likes: '9384759823'
    }

    const component = render(
        <SimpleBlog blog={blog} onClick={()=>{console.log('clicked')}} />
    )

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