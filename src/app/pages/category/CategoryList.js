import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllCategories, deleteCategory, resetDeleteCategory } from '../../actions/Category';
import Table from '../../rui/table';
import Popconfirm from '../../rui/popconfirm';
import alertService from '../../services/AlertService';
import { defaultPageSize, defaultPageCount } from '../../constants';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {
                name: ''
            },
            filter: null,
            pageSize: defaultPageSize,
            pageCount: defaultPageCount
        }
    }

    componentDidMount() {
        this.getAllCategories(this.state.filter, this.state.pageSize, this.state.pageCount);
    }

    componentWillUnmount() {
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.deleted.data || nextProps.deleted.error) && !nextProps.deleted.isFetching) {
            nextProps.deleted.error ? alertService.error('删除失败', nextProps.deleted.error) : alertService.success('删除成功');
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    onPageChange = (pageSize) => {
        this.setState({
            pageSize: pageSize
        });
        this.getAllCategories(this.state.filter, pageSize, this.state.pageCount);
    }

    getPagination(total) {
        return {
            pageSize: this.state.pageSize,
            pageCount: this.state.pageCount,
            total: total,
            onChange: this.onPageChange
        }
    }

    handleNameChange(e) {
        this.setState({
            search: {
                name: e.target.value
            }
        });
    }

    getAllCategories(filter, pageSize, pageCount) {
        this.props.getAllCategories(filter, pageSize, pageCount);
    }

    search() {
        const filter = {};
        if (this.state.search.name) {
            filter.name = this.state.search.name;
        }
        this.setState({ filter: filter, pageSize: defaultPageSize, pageCount: defaultPageCount });
        this.getAllCategories(filter, defaultPageSize, defaultPageCount);
    }

    reset() {
        this.setState({
            search: {
                name: ''
            },
            filter: null
        });
    }

    onConfirmDelete(id) {
        this.props.deleteCategory(id);
    }

    render() {
        const { data, error, isFetching } = this.props.list;
        const deleted = this.props.deleted;
        const pagination = data ? this.getPagination(data.total) : null;
        const columns = [
            {
                title: '类别',
                key: 'name',
                dataIndex: 'name'
            },
            {
                title: '状态',
                key: 'enabled',
                dataIndex: 'enabled',
                render: (enabled) => (
                    <span>
                        {enabled ? '启用' : '禁用'}
                    </span>
                ),
            },
            {
                title: '操作',
                key: 'action',
                dataIndex: 'id',
                render: (id) => (
                    <div>
                        <Link to={`/category/edit/${id}`} className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> 编辑</Link>
                        <Popconfirm title="你确认要删除这条记录?" onConfirm={() => this.onConfirmDelete(id)} okText="确定" cancelText="取消">
                            <button type="button" className="btn btn-danger btn-xs" disabled={id === deleted.data && deleted.isFetching}>
                                <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> {id === deleted.data && deleted.isFetching ? '正在删除' : '删除'}
                            </button>
                        </Popconfirm>
                    </div>
                ),
            }
        ];

        return (
            <div>
                <div className="page-title">
                    <div className="title_left">
                        <h3>分类目录</h3>
                    </div>

                    <div className="title_right">
                        <div className="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                            test
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>所有分类 <small><Link to='/category/add' className='btn btn-primary btn-xs'><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 添加</Link></small></h2>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                {/*<p className="text-muted font-13 m-b-30">
                                DataTables has most features enabled by default, so all you need to do to use it with your own tables is to call the construction function: <code>$().DataTable();</code>
                            </p>*/}
                                <form className="form-inline search-from">
                                    <div className="form-group">
                                        <label htmlFor="name">类别</label>
                                        <input type="text" className="form-control" id="name" value={this.state.search.name} onChange={(e) => this.handleNameChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="btn btn-primary btn-sm" onClick={() => this.search()}>搜索</button>
                                        <button type="button" className="btn btn-default btn-sm" onClick={() => this.reset()}>重置</button>
                                    </div>
                                </form>
                                {data ? <Table columns={columns} dataSource={data.result} pagination={pagination} loading={isFetching} /> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        list: state.category.list,
        deleted: state.category.deleted
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCategories: (filter, pageSize, pageCount) => dispatch(getAllCategories(filter, pageSize, pageCount)),
        deleteCategory: (id) => dispatch(deleteCategory(id)),
        resetMe: () => dispatch(resetDeleteCategory())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryList)