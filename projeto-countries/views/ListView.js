import { Table } from '../components/TableList.js';

class ListView {
    static renderList(countries) {
        const listContainer = document.getElementById('countries-list');
        listContainer.innerHTML = '';
        const table = new Table(countries);
        table.render(listContainer);
    }
}

export default ListView;