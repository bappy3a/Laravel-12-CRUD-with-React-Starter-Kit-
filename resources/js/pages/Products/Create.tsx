import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a new product',
        href: '/products/create',
    },
];

export default function Create() {

    const {data, setData, post, processing, errors} = useForm({
        name: '',
        price: '',
        description: '',
    });

    const hendelSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'), {
            onSuccess: () => {
                setData({
                    name: '',
                    price: '',
                    description: '',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crate a new products" />
            <div className='w-9/12 m-4'>
                <form onSubmit={hendelSubmit} className='space-y-4'>
                    <div className='grid grid-cols-1 gap-1.5'>
                        <label htmlFor="Product Name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <Input value={data.name} onChange={(e) => setData('name', e.target.value )} placeholder='Product name' type='text'></Input>
                        <InputError message={errors.name} />
                    </div>
                    <div className='grid grid-cols-1 gap-1.5'>
                        <label htmlFor="Product Price" className="block text-sm font-medium text-gray-700">
                            Price
                        </label>
                        <Input value={data.price} onChange={(e) => setData('price', e.target.value )}  placeholder='Product price' type='number'></Input>
                        <InputError message={errors.price} />
                    </div>
                    <div className='grid grid-cols-1 gap-1.5'>
                        <label htmlFor="Product Description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <Textarea value={data.description} onChange={(e) => setData('description', e.target.value )}  placeholder='Product Description'></Textarea>
                        <InputError message={errors.description} />
                    </div>
                    <Button className='mt-3 cursor-pointer'>Create Product</Button>
                </form>
            </div>
        </AppLayout>
    );
}
