import { AddArticleDialog } from './components/add-article-dialog';
import { AddArticleForm } from './components/add-article-form';

export function AddArticleEntrypoint() {
    return <AddArticleDialog>
        {/* @ts-expect-error Server Component */}
        <AddArticleForm />
    </AddArticleDialog>
}