import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardNav from "@/components/DashboardNav";
import { Loader2, LayoutDashboard, ShoppingBag, Plus, CheckCircle2, Clock, Truck, Package, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const statusOptions = [
    { value: "Pending", icon: Clock, color: "!bg-amber-600 !text-white border-amber-700 shadow-[0_0_15px_rgba(217,119,6,0.3)] animate-pulse", itemColor: "text-amber-500" },
    { value: "Processing", icon: Package, color: "!bg-blue-600 !text-white border-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.3)] animate-pulse", itemColor: "text-blue-500" },
    { value: "Shipped", icon: Truck, color: "!bg-indigo-600 !text-white border-indigo-700 shadow-[0_0_15px_rgba(79,70,229,0.3)]", itemColor: "text-indigo-500" },
    { value: "Delivered", icon: CheckCircle2, color: "!bg-emerald-600 !text-white border-emerald-700 shadow-[0_0_15px_rgba(5,150,105,0.3)]", itemColor: "text-emerald-500" },
    { value: "Cancelled", icon: XCircle, color: "!bg-rose-600 !text-white border-rose-700 shadow-[0_0_15px_rgba(225,29,72,0.3)]", itemColor: "text-rose-500" },
];

const getStatusConfig = (status) => {
    // Handle "Completed" as a legacy alias for "Delivered"
    const normalizedStatus = status === "Completed" ? "Delivered" : status;
    return statusOptions.find(opt => opt.value === normalizedStatus) || {
        value: status,
        icon: Clock,
        color: "bg-muted text-muted-foreground border-border",
        itemColor: "text-muted-foreground"
    };
};

const Orders = () => {
    const queryClient = useQueryClient();
    const { data: orders = [], isLoading, error } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/api/orders");
            if (!res.ok) throw new Error("Failed to fetch orders");
            return res.json();
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ orderId, status }) => {
            const putUrl = `http://localhost:5000/api/orders/status/${orderId}`;
            console.log(`[FRONTEND] Trying PUT to: ${putUrl} with status: ${status}`);
            const res = await fetch(putUrl, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            if (!res.ok) {
                const errorText = await res.text();
                let errorMessage = "Server Error";
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMessage = errorJson.message || errorMessage;
                } catch (e) { }
                throw new Error(errorMessage);
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
            toast.success("Order status updated");
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        }
    });

    const handleStatusChange = (orderId, newStatus) => {
        updateStatusMutation.mutate({ orderId, status: newStatus });
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
    );

    if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error.message}</div>;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-2 sm:px-4 pt-40 pb-16 sm:pt-64 sm:pb-24">
                <DashboardNav />

                <Card className="glass-card border-border/50 max-w-5xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-display">Orders</CardTitle>
                        <CardDescription>Manage and view all customer orders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Desktop Table View */}
                            <div className="hidden md:block rounded-md border border-border/50 overflow-hidden bg-card/30 backdrop-blur-sm">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="hover:bg-muted/50 border-border/50">
                                            <TableHead className="w-[100px]">Order ID</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Items</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead>Payment</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead className="text-right">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orders.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="h-24 text-center">
                                                    No orders found.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            orders.map((order) => (
                                                <TableRow key={order._id} className="hover:bg-primary/5 border-border/50 transition-colors">
                                                    <TableCell className="font-mono text-xs opacity-70">
                                                        {order._id.slice(-6)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="font-medium">{order.shippingDetails.name}</div>
                                                        <div className="text-xs text-muted-foreground">{order.shippingDetails.city}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {order.items.map((item, i) => (
                                                            <div key={i} className="text-sm">
                                                                {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                                                            </div>
                                                        ))}
                                                    </TableCell>
                                                    <TableCell className="font-bold text-primary">
                                                        ${order.totalAmount.toLocaleString()}
                                                    </TableCell>
                                                    <TableCell className="capitalize opacity-80">
                                                        {order.paymentMethod}
                                                    </TableCell>
                                                    <TableCell className="text-xs text-muted-foreground">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Select
                                                            key={order.status}
                                                            value={order.status}
                                                            onValueChange={(value) => handleStatusChange(order._id, value)}
                                                            disabled={updateStatusMutation.isPending}
                                                        >
                                                            <SelectTrigger
                                                                className={`w-[140px] ml-auto h-8 text-xs font-bold uppercase tracking-wider rounded-lg border-2 transition-all duration-300 ${getStatusConfig(order.status).color}`}
                                                            >
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent className="glass-card border-border/50">
                                                                {statusOptions.map((opt) => (
                                                                    <SelectItem
                                                                        key={opt.value}
                                                                        value={opt.value}
                                                                        className={`text-xs font-bold uppercase tracking-widest focus:bg-primary/10 transition-colors ${opt.itemColor}`}
                                                                    >
                                                                        <div className="flex items-center gap-2">
                                                                            <opt.icon className="w-4 h-4" />
                                                                            {opt.value}
                                                                        </div>
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden space-y-4">
                                {orders.length === 0 ? (
                                    <div className="text-center py-10 text-muted-foreground border border-dashed border-border/50 rounded-xl">
                                        No orders found.
                                    </div>
                                ) : (
                                    orders.map((order) => (
                                        <div key={order._id} className="bg-card/50 border border-border/40 rounded-2xl p-4 shadow-sm backdrop-blur-sm space-y-4">
                                            <div className="flex justify-between items-start border-b border-border/10 pb-3">
                                                <div>
                                                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Order ID</div>
                                                    <div className="font-mono text-sm">#{order._id.slice(-6)}</div>
                                                </div>
                                                <Select
                                                    key={order.status}
                                                    value={order.status}
                                                    onValueChange={(value) => handleStatusChange(order._id, value)}
                                                    disabled={updateStatusMutation.isPending}
                                                >
                                                    <SelectTrigger
                                                        className={`w-[130px] h-9 text-[10px] font-bold uppercase tracking-wider rounded-xl border-2 transition-all duration-300 ${getStatusConfig(order.status).color}`}
                                                    >
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent className="glass-card border-border/50">
                                                        {statusOptions.map((opt) => (
                                                            <SelectItem
                                                                key={opt.value}
                                                                value={opt.value}
                                                                className={`text-[10px] font-bold uppercase tracking-widest focus:bg-primary/10 transition-colors ${opt.itemColor}`}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <opt.icon className="w-4 h-4" />
                                                                    {opt.value}
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Customer</div>
                                                    <div className="font-bold text-sm">{order.shippingDetails.name}</div>
                                                    <div className="text-xs opacity-70">{order.shippingDetails.city}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Total Amount</div>
                                                    <div className="font-bold text-primary text-base">${order.totalAmount.toLocaleString()}</div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Order Items</div>
                                                <div className="space-y-1">
                                                    {order.items.map((item, i) => (
                                                        <div key={i} className="flex justify-between items-center text-xs bg-muted/30 p-2 rounded-lg">
                                                            <span>{item.name}</span>
                                                            <span className="font-bold">x{item.quantity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center pt-2 text-[10px] text-muted-foreground">
                                                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                                <span className="uppercase tracking-widest">{order.paymentMethod}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default Orders;
