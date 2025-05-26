import { supabase_client } from "../components/supabase-client";

export const OnClickNode = async (node, sigma, setPopupOpen, setPopupContent) => {
    const nodeData = sigma.getGraph().getNodeAttributes(node);
    const markdown = nodeData.metadata.markdown || "";
    let translations = [];

    console.log("Node data:", nodeData);
    console.log("Node: ", node);

    const { data, error } = await supabase_client
        .from('nodes')
        .select(`
            tags (
                translations (
                    id,
                    original_text,
                    translation_text
                    )
                )
        `).eq('id', node);

    console.log("Node clicked:", node, nodeData);

    const translationsList = data.flatMap(node =>
        node.tags.map(tag => ({
            original: tag.translations.original_text,
            translation: tag.translations.translation_text
        }))
    );

    console.log("Translations list:", translationsList);


    if (data && !error) {
        translations = translationsList;
    } else {
        console.error("Error fetching translations:", error);
    }

    setPopupContent({ markdown, translations });
    setPopupOpen(true);
}