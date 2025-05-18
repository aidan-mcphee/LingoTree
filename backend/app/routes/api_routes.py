from flask import Blueprint, render_template

from backend.app.services.node_service import get_Nodes

api_bp = Blueprint('api', __name__)

@api_bp.route('/nodeTest')
def node_test():
    nodes = get_Nodes()
    return nodes