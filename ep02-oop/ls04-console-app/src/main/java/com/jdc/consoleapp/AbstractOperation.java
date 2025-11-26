package com.jdc.consoleapp;

public abstract class AbstractOperation implements Operation {

	private final int id;
	private final String name;
	
	public AbstractOperation(int id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	
	@Override
	public int getId() {
		return this.id;
	}
	
	@Override
	public String getName() {
		return this.name;
	}
	
	@Override
	public void doBusiness() {
		showTitle();
		doOperate();
	}
	
	public abstract void doOperate();
	
	protected void showTitle() {
		System.out.println("""
				
				%s
				----------------------------
				""".formatted(name));
	}
}
