import { render, screen } from '@testing-library/react';
import Form from '../Form';
import history from 'util/history';
import { Router, useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { server } from './fixtures';
import selectEvent from 'react-select-event';

beforeAll(() => server.listen())
afterAll(() => server.resetHandlers())
afterAll(() => server.close())

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}))

describe('Product form create tests', () => {

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: 'create'
        })
    })

    test('Should render Form', async () => {

        render(
            <Router history={history}>
                <Form />
            </Router>
        )

        const nameInput = screen.getByTestId("name")
        const priceInput = screen.getByTestId("price")
        const imgUrlInput = screen.getByTestId("imgUrl")
        const descriptionInput = screen.getByTestId("description")
        const categoriesInput = screen.getByLabelText("Categorias")

        const submitButton = screen.getByRole('button', { name: /salvar/i })

        await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores'])

        userEvent.type(nameInput, "Computador")
        userEvent.type(priceInput, "5000.12")
        userEvent.type(imgUrlInput, "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/23-big.jpg");
        userEvent.type(descriptionInput, "Computador muito bom")

        userEvent.click(submitButton)

    })
})
