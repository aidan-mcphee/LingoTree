import { supabase_client } from "../components/supabase-client";

async function getAccessToken() {
    const { data, error } = await supabase_client.auth.getSession();
    if (error || !data.session) {
        throw new Error('User not authenticated');
    }
    return data.session.access_token;
}

export const GenerateChildrenNodes = async (parentId, graph) => {
    try {
        const accessToken = await getAccessToken();

        const response = await fetch(
            'https://xzsuetmvswxiawunyjil.supabase.co/functions/v1/Create-nodes',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ "node_id" : parentId })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Edge function call failed');
        }

        console.log('Edge function response:', result);

        return result;
    } catch (error) {
        console.error('Error calling edge function:', error);
        throw error;
    }
}

export const DeleteNode = async (node_id, graph, nodes) => { 
    // look for nodes in nodes that have parent_id equal to node_id
    const children = nodes.filter(node => node.parent_id === node_id);
    if (children.length > 0) {
        for (const child of children) {
            await DeleteNode(child.id, graph, nodes);
        }
        await DeleteSingleNode(node_id, graph);
    }
    else {
        await DeleteSingleNode(node_id, graph)
    }
}

const DeleteSingleNode = async (node_id, graph) => {
    const { data: { user } } = await supabase_client.auth.getUser()
    console.log("Deleting node user for node_id:", node_id, "and user_id:", user.id);
    const { data, error } = await supabase_client
        .from('nodeusers')
        .delete()
        .eq('node_id', node_id)
        .eq('user_id', user.id);
    if (error) {
        console.error("Error deleting node user:", error);
        throw error;
    }
}