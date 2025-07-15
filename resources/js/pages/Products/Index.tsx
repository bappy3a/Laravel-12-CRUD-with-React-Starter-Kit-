import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface PageProps {
    products: Product[];
    flash: {
        message?: string;
        error?: string;
    };
}

export default function Index() {
    const { products, flash } = usePage().props;
    const { processing, delete: destroy } = useForm();

    const hendelDelete = (id: number) => {
        if(confirm('Are you sure you want to delete this product?')) {
            // Call the delete function here
            deleteProduct(id);
        }
        // Implement delete functionality here
        // For example, you can use Inertia's post method to send a delete request
        // post(route('products.destroy', productId), { _method: 'delete' });
    };

    const deleteProduct = (id: number) => {
        destroy(route('products.destroy', id), {
            onSuccess: () => {
                // Optionally, you can show a success message or perform other actions
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="m-4 flex items-center justify-between">
                <Link href={route('products.create')}>
                    {' '}
                    <Button className="cursor-pointer">Create a product</Button>{' '}
                </Link>
            </div>
            <div>{flash.message && <Alert>{flash.message}</Alert>}</div>
            {products.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className=' text-center'>SI</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead >Amount</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead  className="w-[100px] text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product,index)  => (
                            <TableRow key={product.id}>
                                
                                <TableCell className="font-medium text-center">{index+1}</TableCell>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell className="flex items-center justify-center space-x-2">
                                    <Link href={route('products.edit', product.id)} className="text-blue-500 hover:underline">
                                        <Button className='cursor-pointer'>Edit</Button>
                                    </Link>
                                    <Button disabled={processing} onClick={() => hendelDelete(product.id)} className='bg-red-500 hover:bg-red-700 cursor-pointer'>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                // <div className='w-9/12 m-4'>
                //     <table className='w-full'>
                //         <thead>
                //             <tr className='border-b'>
                //                 <th className='text-left py-2'>Name</th>
                //                 <th className='text-left py-2'>Price</th>
                //                 <th className='text-left py-2'></th>
                //                 <th className='text-left py-2'>Actions</th>
                //             </tr>
                //         </thead>
                //         <tbody>
                //             {products.map((product) => (
                //                 <tr key={product.id} className='border-b'>
                //                     <td className='py-2'>{product.name}</td>
                //                     <td className='py-2'>{product.price}</td>
                //                     <td className='py-2'>{product.description}</td>
                //                     <td className='py-2'>
                //                         <Link href={route('products.edit', product.id)} className='text-blue-500 hover:underline'>Edit</Link>
                //                     </td>
                //                 </tr>
                //             ))}
                //         </tbody>
                //     </table>
                // </div>
                <div className="m-4 w-9/12">
                    <Alert variant="destructive">No products found.</Alert>
                </div>
            )}
        </AppLayout>
    );
}
